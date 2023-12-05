import { AppErrors } from "@cartola-do-tavinho/pk-models/models/error";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { debug } from "./utils";
import { CustomError, ITypeError } from "./error";

interface IApiError {
	code: number;
	payload: any;
}

export class HttpAxios {
	constructor(private urlApiBase: string) {
		axios.interceptors.request.use(async (config: any) => {
			try {
				// TODO: implementar o JWT
				//   Object.assign(config.headers, headers)
			} catch (err) {
			} finally {
				return config;
			}
		});

		// axios.interceptors.response.use(async (response) => {
		//     debug('Res ' +response.config.method + ' => ' + response.config.url, response);
		//     return response;
		// });
	}

	async executeAxios(config: AxiosRequestConfig<any>): Promise<AxiosResponse<unknown, any>> {
		try {
			let result = await axios(config);
			debug(`(${result.status}) ${config.method}  => ${config.url}`, result, config);

			return JSON.parse(JSON.stringify(result.data), this.reviver);
		} catch (err) {
			let msg = "";
			if (err.isAxiosError && err.message) msg = err.message;
			debug(`ERROR: ${msg} ${config.method}  => ${config.url}`, err, config);

			if (!err.response) throw new CustomError(AppErrors.WEB_INTERNET);

			if (err.response.data?.ApiError?.status) {
				let apiError = err.response.data.ApiError as ITypeError;
				throw new CustomError(apiError);
			}
			throw new CustomError(AppErrors.INTERNAL);
		}
	}

	async get(path: string): Promise<any> {
		let config: AxiosRequestConfig = {
			url: this.urlApiBase + path,
			method: "get",
		};

		try {
			let result = await this.executeAxios(config);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async post(path: string, body: any): Promise<any> {
		let config: AxiosRequestConfig = {
			url: this.urlApiBase + path,
			method: "post",
			data: body,
		};

		try {
			let result = await this.executeAxios(config);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async patch(path: string, body: any): Promise<any> {
		let config: AxiosRequestConfig = {
			url: this.urlApiBase + path,
			method: "patch",
			data: body,
		};
		try {
			let result = await this.executeAxios(config);
			return result;
		} catch (err) {
			throw err;
		}
	}
	async delete(path: string, body: any): Promise<any> {
		let config: AxiosRequestConfig = {
			url: this.urlApiBase + path,
			method: "delete",
			data: body,
		};
		try {
			let result = await this.executeAxios(config);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async upload(path: string, files: FileList, name: string): Promise<any> {
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append(name, files[i]);
		}
		let config: AxiosRequestConfig = {
			url: this.urlApiBase + path,
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		};
		try {
			let result = await this.executeAxios(config);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async download(path: string, name: string) {
		try {
			let response = await axios({
				url: this.urlApiBase + path, //your url
				method: "GET",
				responseType: "blob", // important
			});
			const url = window.URL.createObjectURL(new Blob([response.data as any]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "file.pdf"); //or any other extension
			document.body.appendChild(link);
			link.click();

			return;
		} catch (err) {
			throw err;
		}
	}

	reviver(key: string, value: any) {
		const iso8601 =
			/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/gm;
		if (typeof value === "string" && iso8601.test(value)) {
			return new Date(value);
		}

		return value;
	}


}
