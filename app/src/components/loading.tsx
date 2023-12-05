import Swal from 'sweetalert2';

const MIN_WAIT = 3000;

class Loading {
    private dateShow = new Date();
    private minWait = 0;

    showLoading(title?: string, htmlBody?: string, minWait?: number) {
        this.dateShow = new Date();
        this.minWait = minWait || 1000;
        Swal.fire({
            title: title || 'Aguarde',
            html: htmlBody || 'Processando a operação.',
            allowOutsideClick: false,

            didOpen: () => {
                Swal.showLoading()
            },
        })
    }

    hideLoading() {

        let now = new Date();
        //@ts-ignore
        let dif = now - this.dateShow;
        if (this.minWait - dif > 0)
            setTimeout(() => { Swal.close(); }, this.minWait - dif)
        else
            Swal.close();

    }

    contentLoading(msg?: string) {
        return (
            <div className="flex flex-col items-center w-full h-full">

                <div className="  ">
                    <div className="animate-spin">
                        <i className=" bi bi-arrow-repeat text-5xl "></i>
                    </div>
                </div>
                <div>
                    <p>{msg || 'Processando operação'}</p>

                </div>
            </div >

        );
    }

    
}

export const loadingWait = new Loading();