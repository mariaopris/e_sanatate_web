export class AuthUser {
    email: string;
    name: string;
    constructor() {
        this.email = '';
        this.name = '';
    }
}

export class Diagnostic {
    user_id: number;
    recording_id: number;
    disease_id: number;
    type: number;
    symptoms: [];
    date: any;
    result: string;
    result_short: string;
    predictions: [];

    constructor() {
        this.user_id = 0;
        this.recording_id = 0;
        this.disease_id = 0;
        this.type = 0;
        this.symptoms = [];
        this.date = null;
        this.result = '';
        this.result_short = '';
        this.predictions = [];
    }
}

export class File {
    id: number;
    user_id: number;
    address: string|null;
    birthday: any;
    gender: string|null;
    other_affections: string|null;
    phone: any;
    weight: any;
    height: any;

    constructor() {
        this.id = -1;
        this.user_id = 0;
        this.address = '';
        this.birthday = null;
        this.gender = '';
        this.other_affections = 'none';
        this.phone = null;
        this.weight = '';
        this.height = '';
    }

    public parseData(item: any): void {
        this.id = item.id;
        this.user_id = item.user_id;
        this.address = item.address;
        this.birthday = item.birthday;
        this.gender = item.gender;
        this.other_affections = item.other_affections;
        this.phone = item.phone;
        this.weight = item.weight;
        this.height = item.height;
    }
}

export class Recording {
    user_id: number;
    file_name: string;
    path: string;

    constructor() {
        this.user_id = 0;
        this.file_name = '';
        this.path = '';
    }
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
    }
}

export class Statistic {
    date: any;
    no_new_user: number;
    no_new_diagnostic_h: number;
    no_new_diagnostic_l: number;

    constructor() {
        this.date = null;
        this.no_new_user = 0;
        this.no_new_diagnostic_h = 0;
        this.no_new_diagnostic_l = 0;
    }
}