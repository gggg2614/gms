import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import 'uno.css';
import 'vant/lib/index.css';
import { Button, List, Cell, Icon, PullRefresh, Grid, Card, Skeleton,Search } from 'vant';
const components = [List, Cell, Button, Icon, PullRefresh, Grid, Card, Skeleton,Search];
export function createApp() {
	const app = createSSRApp(App);
	components.forEach((component) => app.use(component));
	// Configure store
	setupStore(app);
	return {
		app,
	};
}
