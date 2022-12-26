1. Install package with `npm install`
2. Start application with `npm start`
3. Send request to API
* Request Parameter
<pre class="json">
{
	"salary": 10000000,
	"overtimes": [{
			"date": "2022-12-24",
			"start": "09:00:00",
			"end": "19:00:00"
		},
		{
			"date": "2022-12-25",
			"start": "09:00:00",
			"end": "15:00:00"
		},
		{
			"date": "2022-12-26",
			"start": "18:00:00",
			"end": "20:00:00"
		}
	]
}
</pre>
* URL: `http://<your-ip-address>:<your-port>/calculate-overtime` (e.g: http://localhost:8000/calculate-overtime)
