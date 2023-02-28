import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import 'uno.css';
import 'vant/lib/index.css';
import { Button, List, Cell ,Icon} from 'vant';
export function createApp() {
	const app = createSSRApp(App);
	app.use(List);
	app.use(Cell);
	app.use(Icon);
	// Configure store
	setupStore(app);

	return {
		app,
	};
}
