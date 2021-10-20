package com.stb.cockpit.plugin.service;

import java.util.Map.Entry;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;
import org.apache.camel.ProducerTemplate;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.camunda.bpm.engine.rest.dto.ExceptionDto;

public class CamelLib {
	private static final Logger logger = LogManager.getLogger(CamelLib.class);

	public CamelLib(CamelContext camelContext) {
		super();
		this.camelContext = camelContext;
	}

	private CamelContext camelContext;

	public Response callRoute(String route, Object body, HttpHeaders requestHeaders) {
		ProducerTemplate template = camelContext.createProducerTemplate();

		try {
			Exchange exchange = template.send(route, new Processor() {
				@Override
				public void process(Exchange exchange) throws Exception {
					Message in = exchange.getIn();
					for (String header : requestHeaders.getRequestHeaders().keySet()) {
						// logger.info("[" + header + "] --> " + requestHeaders.getRequestHeaders().getFirst(header));
						in.setHeader(header, requestHeaders.getRequestHeaders().getFirst(header));
					}
					in.setBody(body);
				}
			});
			Object httpResponseCodeObj = exchange.getIn().getHeaders().get(Exchange.HTTP_RESPONSE_CODE);
			int httpResponseCode = (httpResponseCodeObj == null) ? 200 : Integer.parseInt((String) httpResponseCodeObj);

			logger.info("HttpResponseCode = " + httpResponseCode);
			logger.info("In: " + exchange.getIn().getBody());
			logger.info("Out: " + exchange.getOut().getBody());

			ResponseBuilder builder = Response.status(httpResponseCode).entity(exchange.getIn().getBody());

			for (Entry<String, Object> it : exchange.getIn().getHeaders().entrySet()) {
				Object headerValueObj = it.getValue();
				String strHeaderValue = "";
				if (StringUtils.startsWith(it.getKey(), "content-length")) {
					continue;
				}
				if (headerValueObj instanceof String) {
					strHeaderValue = (String) headerValueObj;
				}
				// logger.info(it.getKey() + " -- " + strHeaderValue);
				builder = builder.header(it.getKey(), strHeaderValue);
			}
			return builder.build();
		} catch (Exception e) {
			logger.error("CallRoute fail", e);
			return Response.status(500).entity(ExceptionDto.fromException(e)).build();
		}
	}

	public CamelContext getCamelContext() {
		return camelContext;
	}

	public void setCamelContext(CamelContext camelContext) {
		this.camelContext = camelContext;
	}
}
