https://developers.google.com/maps/apis-by-platform#web_service_apis
web_service_apis should be protected with IP address restrictions only, otherwise:

{
   "error_message" : "API keys with referer restrictions cannot be used with this API.",
   "results" : [],
   "status" : "REQUEST_DENIED"
}

https://developers.google.com/maps/faq?hl=fr
Important: If you are using any of the web service APIs with an API key that has referer restrictions, your requests will fail with the error message: "API keys cannot have referer restrictions when used with this API." You should switch to using an API key with IP address restrictions.

to study:
https://console.cloud.google.com/google/maps-apis/api-list?project=blissful-answer-270918
https://developers.google.com/maps/api-key-best-practices


https://cloud.google.com/docs/authentication/api-keys
All Google Cloud services allow access using credentials such as service accounts. However, only a limited number of Google Cloud services allow access using just an API key, without also using another type of credential:

* Google Cloud Natural Language API 
* Google Cloud Speech API
* Cloud Translation API
* Cloud Vision API
* Cloud Endpoints API 
* Cloud Billing Catalog API 
* Cloud Data Loss Prevention API

