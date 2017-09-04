export default async(type = 'GET', url = '', data = {},headerData = {}, method = 'fetch',body = 'json') => {
	type = type.toUpperCase();

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			if(typeof data[key] == "string"){
				data[key] = data[key].replace(/\+/g, "%2B");
				data[key] = data[key].replace(/\&/g, "%26");
			}

			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			if(url.indexOf('?')>-1){
				url = url + '&' + dataStr;
			}else{
				url = url + '?' + dataStr;
			}

		}
	}
	if (window.fetch && method == 'fetch') {

		let headers = {
				'Accept': 'application/json',
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			};
		function isEmptyObject(e) {  
		    var t;  
		    for (t in e)  
		        return !1;  
		    return !0  
		}  
		if(!isEmptyObject(headerData)){
			for (let i in headerData){
				headers[i] = headerData[i]
			} 
		}

		let requestConfig = {
			//credentials: 'include',
			method: type,
			headers,
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				if(typeof data[key] == "string"){
					data[key] = data[key].replace(/\+/g, "%2B");
					data[key] = data[key].replace(/\&/g, "%26");
				}
				dataStr += key + '=' + data[key] + '&';
			})
			Object.defineProperty(requestConfig, 'body', {
				value: dataStr
			})
		}
		try {
			var response = await fetch(url, requestConfig);
			if(body == "json"){
				var responseJson = await response.json();
			}else if(body == "text"){
				var responseJson = await response.text();
			}

		} catch (error) {
			throw new Error(error)
		}
		return responseJson
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				for(var key in data){
					if(typeof data[key] == "string"){
						data[key] = data[key].replace(/\+/g, "%2B");
						data[key] = data[key].replace(/\&/g, "%26");
					}
					sendData =sendData+ key+"="+data[key]+"&";
				}
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			function isEmptyObject(e) {  
			    var t;  
			    for (t in e)  
			        return !1;  
			    return !0  
			} 
			if(!isEmptyObject(headerData)){
				for (let i in headerData){
					requestObj.setRequestHeader(i,headerData[i])
				} 
			}
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object' && body == 'json') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject('Not found')
					}
				}
			}
		})
	}
}
