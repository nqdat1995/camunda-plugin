package org.camunda.bpm.cockpit.plugin.sample.resources;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;

public class MyRoute extends RouteBuilder {

	@Override
	public void configure() throws Exception {
		from("direct:specialRoute").process(new Processor() {
			public void process(Exchange msg) {
				System.out.println("Processing special file: " + msg);
			}
		});
	}

}
