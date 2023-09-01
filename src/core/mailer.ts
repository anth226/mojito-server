import sgMail, { MailDataRequired } from "@sendgrid/mail";

interface MailToSend {
    to: string
    from:string
    subject: string
    type:string
}

export class Mailer {
constructor (private apiKey: string){
    sgMail.setApiKey(this.apiKey);
}


async SendMail(MailToSend: MailDataRequired): Promise<{success:boolean}>{

    try {
        await sgMail.send(MailToSend);
        return {success:true};
      } catch (error) {
        return {success:false};
      }    

}
}