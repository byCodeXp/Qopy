
export class KeyEventHandler {

    private events: Array<{ key: string, callback: (...args: any[]) => void, args: any[] }> = [];

    on(key: string, callback: (...args: any[]) => void, ...args: any[]) {

        this.events.push({ key, callback, args });
    }

    test(key: string) {

        for (let i = 0; i < this.events.length; i++) {

            const event = this.events[i];

            if (event.key.includes(key)) {

                event.callback(...event.args);
            }
        }
    }
}