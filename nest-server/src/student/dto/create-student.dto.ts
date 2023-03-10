export class CreateStudentDto {
    readonly stunames: string
    readonly stuclasses: string
    readonly genders: string
    // readonly idcards: number
    readonly phone: string
    readonly company: Array<string>
    readonly emails: string
    readonly address: Array<number>
    readonly workplaces: Array<number>
    readonly jobs: string
    readonly salaries: string
    readonly industries: Array<string>
}
