import {json} from 'd3-fetch';

document.querySelector('button').addEventListener('click', e => {
	const login = document.querySelector('input').value;

	console.log('login', login)


})

const instanceOrigin = 'https://eldritch.cafe';
const client_id = 'GwWo432HtZtw_gZh_Ax7lTVJgmaTSyu4vPW9bK9cUTg'
const client_secret = 'K_8ZGn740wCsJgPzif0sUf33589eKelPIhz7AlcSOhM'
const redirect_uri = 'http://localhost:5000/';

const params = new URLSearchParams(location.search);
const code = params.get('code');

console.log('code', code)

json(`${instanceOrigin}/oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code&code=${code}`, {method: 'POST'})
.then(res => {
	console.log('res', res)

	const {access_token} = res

	return json(`${instanceOrigin}/api/v1/accounts/verify_credentials`, {headers: {
		'Authorization': `Bearer ${access_token}`
	}})
	.then(account => {
		console.log('logged account', account)

		return json(`${instanceOrigin}/api/v1/notifications?limit=${1000}`, {headers: {
			'Authorization': `Bearer ${access_token}`
		}})
		.then(notifs => {
			console.log('notifs', notifs)
		})
	})
})
.catch(err => console.error('post nia nia', err))



/*import App from './App.svelte';

const app = new App({
	target: document.querySelector('.svelte-main'),
	props: {
		name: 'from Svelte'
	}
});

export default app;*/