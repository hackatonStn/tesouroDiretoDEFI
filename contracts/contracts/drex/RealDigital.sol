// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./CBDCAccessControl.sol";

import "hardhat/console.sol";

/**
 * @title RealDigital
 * @dev Implementação do contrato Real Digital.
 */
contract RealDigital is ERC20, CBDCAccessControl, Pausable {
    // Uso do SafeMath para prevenir overflow e underflow
    using Math for uint256;

    // Cria um mapeamento entre endereços e suas quantidades de saldo congelado.
    mapping(address => uint256) private _frozenBalances;

    // Define um evento que é acionado sempre que o saldo congelado de uma carteira é alterado.
    event FrozenBalance(address indexed wallet, uint256 amount);

    // Modifier para verificar se um endereço possui fundos suficientes. Usado no _beforeTokenTransfer.
    modifier checkFrozenBalance(address from, uint256 amount) {
        if (from != address(0)) {
            require(
                balanceOf(from) - frozenBalanceOf(from) >= amount,
                "RealDigital: insufficient balance"
            );
        }
        _;
    }

    // O construtor é chamado quando o contrato é publicado. Ele define o nome e o símbolo do token, e configura as funções de permissão.
    constructor(
        string memory _name,
        string memory _symbol,
        address _authority,
        address _admin
    ) ERC20(_name, _symbol) CBDCAccessControl(_authority, _admin) {}

    // A função 'pause' permite que um endereço com PAUSER_ROLE pause todas as transferências de tokens.
    function pause() public whenNotPaused onlyRole(PAUSER_ROLE) {
        _pause();
    }

    // A função 'unpause' permite que um endereço com PAUSER_ROLE retome todas as transferências de tokens.
    function unpause() public whenPaused onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    // Função que é chamada antes de qualquer transferência de tokens. Ela verifica se a transferência é válida
    // e permite que a transferência seja pausada.
    function _update(
        address from,
        address to,
        uint256 amount
    )
        internal
        virtual
        override
        whenNotPaused
        checkFrozenBalance(from, amount)
        checkAccess(from, to)
    {
        super._update(from, to, amount);
    }

    // A função 'burn' permite que um endereço com a permissão BURNER_ROLE queime uma quantidade específica de tokens de
    // seu próprio saldo.
    function burn(uint256 amount) public onlyRole(BURNER_ROLE) whenNotPaused {
        _burn(_msgSender(), amount);
    }

    // A função 'burnFrom' permite que um endereço queime uma quantidade específica de tokens de qualquer endereço,
    // desde que o queimador tenha uma permissão de 'allowance' suficiente do endereço de onde os tokens serão queimados.
    function burnFrom(
        address account,
        uint256 amount
    ) public virtual whenNotPaused {
        require(
            allowance(account, _msgSender()) >= amount,
            "ERC20: burn amount exceeds allowance"
        );
        uint256 decreasedAllowance = allowance(account, _msgSender()) - amount;
        _approve(account, _msgSender(), decreasedAllowance);
        _burn(account, amount);
    }

    // A função 'decimals' retorna o número de casas decimais que o token usa - neste caso, 2.
    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    // Função para incrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.
    function increaseFrozenBalance(
        address from,
        uint256 amount
    ) public whenNotPaused onlyRole(FREEZER_ROLE) {
        _frozenBalances[from] += amount;
        emit FrozenBalance(from, _frozenBalances[from]);
    }

    // Função para decrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.
    function decreaseFrozenBalance(
        address from,
        uint256 amount
    ) public whenNotPaused onlyRole(FREEZER_ROLE) {
        require(
            _frozenBalances[from] >= amount,
            "Frozen balance is not enough"
        );
        _frozenBalances[from] -= amount;
        emit FrozenBalance(from, _frozenBalances[from]);
    }

    // Retorna o saldo congelado de uma conta específica.
    function frozenBalanceOf(address account) public view returns (uint256) {
        return _frozenBalances[account];
    }

    // Função que permite a um endereço com MINTER_ROLE criar uma certa quantidade de tokens e enviá-los para um endereço.
    function mint(
        address to,
        uint256 amount
    ) public whenNotPaused onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // Função para mover tokens de uma carteira para outra. Somente quem possuir MOVER_ROLE pode executar.
    function move(
        address from,
        address to,
        uint256 amount
    ) public whenNotPaused onlyRole(MOVER_ROLE) {
        _transfer(from, to, amount);
    }

    // Função para destruir tokens de uma carteira. Somente quem possuir MOVER_ROLE pode executar.
    function moveAndBurn(
        address from,
        uint256 amount
    ) public whenNotPaused onlyRole(MOVER_ROLE) {
        _transfer(from, address(this), amount);
        _burn(address(this), amount);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override whenNotPaused returns (bool) {
        require(
            verifyAccount(_msgSender()),
            "Sender account is not authorized"
        );
        require(verifyAccount(to), "Receiver account is not authorized");

        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(
        address spender,
        uint256 amount
    ) public override whenNotPaused returns (bool) {
        require(
            verifyAccount(_msgSender()),
            "Sender account is not authorized"
        );
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override whenNotPaused returns (bool) {
        uint256 allowanceAmount = allowance(from, msg.sender);
        require(
            allowanceAmount >= amount,
            "ERC20: transfer amount exceeds allowance"
        );
        require(
            verifyAccount(from) && verifyAccount(to),
            "Either from or to account is not authorized"
        );

        _transfer(from, to, amount);
        _approve(from, msg.sender, allowanceAmount - amount);

        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual whenNotPaused returns (bool) {
        uint256 allowanceAmount = allowance(msg.sender, spender);
        require(verifyAccount(_msgSender()), "Account is not authorized");
        _approve(msg.sender, spender, allowanceAmount - subtractedValue);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual whenNotPaused returns (bool) {
        require(verifyAccount(_msgSender()), "Account is not authorized");
        uint256 allowanceAmount = allowance(msg.sender, spender);
        require(verifyAccount(_msgSender()), "Account is not authorized");
        _approve(msg.sender, spender, allowanceAmount + addedValue);
        return true;
    }
}
