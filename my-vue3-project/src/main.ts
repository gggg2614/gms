import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import 'uno.css';
import 'vant/lib/index.css';
import { Button, List, Cell, Icon, PullRefresh,Grid,Card } from 'vant';
export function createApp() {
	const app = createSSRApp(App);
	app.use(List);
	app.use(Cell);
	app.use(Button);
	app.use(Icon);
	app.use(PullRefresh);
	app.use(Grid);
	app.use(Card);
	// Configure store
	setupStore(app);

	return {
		app,
	};
}
