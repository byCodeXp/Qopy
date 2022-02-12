export class TabConstructors {
    static createEmpty(): TabType {
        return {
            title: 'untitled',
            path: '',
            content: ''
        };
    }
    static createFromData(title: string, path: string, content: string): TabType {
        return {
            title: 'untitled',
            path: '',
            content: ''
        };
    }
    static async createFromFile(file: File): Promise<TabType> {
        return {
            path: file.path,
            title: file.name,
            content: await file.text()
        };
    }
}
