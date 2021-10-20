package com.stb.cockpit.plugin.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

import org.apache.camel.CamelContext;
import org.camunda.bpm.cockpit.plugin.resource.AbstractPluginRootResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.stereotype.Component;

import com.stb.cockpit.plugin.MyPlugin;
import com.stb.cockpit.plugin.dto.ProcessInstanceCountDto;

@Path("plugin/" + MyPlugin.ID)
@Component
@Configuration
@ImportResource(locations = { "classpath:app-config.xml" })
public class PluginDefinitionRestService extends AbstractPluginRootResource {
	@Autowired
	private CamelContext camelContext;

	public void setCamelContext(CamelContext camelContext) {
		this.camelContext = camelContext;
	}

	public PluginDefinitionRestService() throws Exception {
		super(MyPlugin.ID);
	}

	@GET
	@Path("{engineName}/process-instance")
	public List<ProcessInstanceCountDto> getProcessInstanceResource(@PathParam("engineName") String engineName) {
		System.out.println("Start [process-instance] " + engineName);

		ProcessInstanceCountDto pi = new ProcessInstanceCountDto();
		pi.setInstanceCount(23);
		pi.setKey("CCV");
		List<ProcessInstanceCountDto> lst = new ArrayList<>();
		lst.add(pi);

		try {
			//String rs = new CamelLib(camelContext).callRoute("direct:specialRoute", "{\"data\":\"ddddddd\"}", null, String.class);
			String rs = "";
			System.out.println("[process-instance]: " + rs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("Done [process-instance] " + engineName);
		return lst;
	}

	@POST
	@Path("{engineName}/postWithPlainText")
	public Response postNotification3(String key) {
		ProcessInstanceCountDto dto = new ProcessInstanceCountDto();
		dto.setInstanceCount(22);
		dto.setKey(key);
		return Response.status(200).entity(dto).build();
	}

	@POST
	@Path("{engineName}/postWithHeaders")
	public Response Sample3(String requestBody, @Context HttpHeaders requestHeaders) {
		System.out.println("Start [postWithHeaders] " + requestBody);
		String rs = "SampleResponse";
	
		Response response = new CamelLib(camelContext).callRoute("direct:specialRoute", requestBody, requestHeaders);
		System.out.println("Done [postWithHeaders] " + rs);

		return response;
	}
	
	@POST
	@Path("{engineName}/getContracts")
	public Response Sample44(String requestBody, @Context HttpHeaders requestHeaders) {
		System.out.println("Body: " + requestBody);
		Response response = new CamelLib(camelContext).callRoute("direct:mockData", requestBody, requestHeaders);
		return response;
		//return Response.ok().entity(requestBody).build();
	}
}
