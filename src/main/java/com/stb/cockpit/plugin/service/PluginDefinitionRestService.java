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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
	private static final Logger logger = LogManager.getLogger(PluginDefinitionRestService.class);

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
		logger.info("Start [process-instance] " + engineName);

		ProcessInstanceCountDto pi = new ProcessInstanceCountDto();
		pi.setInstanceCount(23);
		pi.setKey("CCV");
		List<ProcessInstanceCountDto> lst = new ArrayList<>();
		lst.add(pi);

		logger.info("Done [process-instance]");
		return lst;
	}

	@POST
	@Path("{engineName}/{routeName}")
	public Response postWithHeaders(@Context HttpHeaders requestHeaders, @PathParam("routeName") String routeName, String requestBody) {
		logger.info("Start [" + routeName + "] " + requestBody);
		Response response = new CamelLib(camelContext).callRoute("direct:" + routeName, requestBody, requestHeaders);
		logger.info("Done [" + routeName + "]");
		return response;
	}
}
