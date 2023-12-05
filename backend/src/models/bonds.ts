export type TypeBond =   'Pre' | 'Pos' ;
export class Bond {
    id: number;
    // campos do ITPFt
    acronym: string;
    code: string;
    maturityDate: Date;

    description: string;
    type?: TypeBond;

}

