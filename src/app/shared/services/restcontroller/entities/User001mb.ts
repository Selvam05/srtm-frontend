import { Person001mb } from "./person001mb";

export class User001mb extends Person001mb  {
    personId?: number;
    dpslno?: number;
    roleid?: number;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    securityquestion?: string;
    securityanswer?: string;
    theme?: string | null;
}