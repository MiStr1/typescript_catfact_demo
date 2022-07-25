import CatFact from './CatFact';
import { CronJob } from 'cron';

class LongCatFact {
	
	private cronJob: CronJob;
	private static axios = require('axios').default;
	public savedCatFact: CatFact;
	
	constructor() {
	}
	
	public static async build(): Promise<LongCatFact> {
		let longCatFact = new LongCatFact();
		longCatFact.cronJob = new CronJob('0 0 * * * *', async () => {
			longCatFact.savedCatFact = await LongCatFact.getLongCatFact();
		});
		longCatFact.savedCatFact = await LongCatFact.getLongCatFact();
		return longCatFact;
	}


	private static async getCatFact(throwError = false): Promise<CatFact> {
		try {
			if (throwError) {
				throw new Error('Something went wrong');
			}
			const response = await LongCatFact.axios.get('https://catfact.ninja/fact?fbclid=IwAR0OjHngBdGak6snknfo1UfLmZpbYc2Qmaumw_BPdbrcc7j2MCPia7GHaH8');
			return response.data as CatFact;
		} catch (exception) {
			process.stderr.write(`ERROR received ${exception}\n`);
			return { fact: '', length: 0 } as CatFact;
		}
	}

	private static async getLongCatFact(): Promise<CatFact> {
		let catFact: CatFact;
		do {
			catFact = await LongCatFact.getCatFact();
		}
		while (catFact.length < 80);
		return catFact;
	}
}

export default LongCatFact;
