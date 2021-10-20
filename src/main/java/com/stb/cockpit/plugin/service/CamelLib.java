package com.stb.cockpit.plugin.service;

import java.util.Arrays;
import java.util.Map.Entry;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;
import org.apache.camel.ProducerTemplate;
import org.camunda.bpm.engine.rest.dto.ExceptionDto;

public class CamelLib {
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
						System.out.println("[" + header + "] --> " + Arrays.toString(requestHeaders.getRequestHeader(header).toArray()));
						in.setHeader(header, requestHeaders.getRequestHeader(header));
					}
					in.setBody(body);

				}
			});
			String httpStatus = (String) exchange.getIn().getHeaders().get(Exchange.HTTP_RESPONSE_CODE);
			int status = (httpStatus == null) ? 200 : Integer.parseInt(httpStatus);

			ResponseBuilder builder = Response.status(status).entity(exchange.getIn().getBody());

			for (Entry<String, Object> it : exchange.getIn().getHeaders().entrySet()) {
				System.out.println(it.getKey() + " -- " + it.getValue());
				builder = builder.header(it.getKey(), it.getValue());
			}

			System.out.println("In: " + exchange.getIn().getBody());
			System.out.println("Out: " + exchange.getOut().getBody());
			return builder.build();
		} catch (Exception e) {
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
