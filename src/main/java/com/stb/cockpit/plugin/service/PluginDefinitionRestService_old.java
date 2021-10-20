package com.stb.cockpit.plugin.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import org.apache.camel.ProducerTemplate;
import org.camunda.bpm.cockpit.plugin.resource.AbstractPluginRootResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.stereotype.Component;

import com.stb.cockpit.plugin.MyPlugin;
import com.stb.cockpit.plugin.dto.ProcessInstanceCountDto;
import com.stb.cockpit.plugin.dto.User;

@Path("plugin/" + MyPlugin.ID)
@Component
@Configuration
@ImportResource(locations = { "classpath:app-config.xml" })
public class PluginDefinitionRestService_old extends AbstractPluginRootResource {
	@Autowired
	private CamelLib camelLib;

//	public CamelLib getCamelLib() {
//		return camelLib;
//	}
//
	public void setCamelLib(CamelLib camelLib) {
		this.camelLib = camelLib;
	}

	public PluginDefinitionRestService_old() throws Exception {
		super(MyPlugin.ID);
	}

	@GET
	@Path("{engineName}/process-instance")
	public List<ProcessInstanceCountDto> getProcessInstanceResource(@PathParam("engineName") String engineName) {
		ProcessInstanceCountDto pi = new ProcessInstanceCountDto();
		pi.setInstanceCount(23);
		pi.setKey("CCV");
		List<ProcessInstanceCountDto> lst = new ArrayList<>();
		lst.add(pi);

		System.out.println("vvv1");

		//camelLib.aaa();
		System.out.println("33333");
		return lst;
	}

	

//	@GET
//	@Path("{engineName}/aaaa")
//	public String aaaa(@PathParam("engineName") String engineName) {
//		System.out.println("zzzzzzzzzzzzzzzzz");
//		String rs = "CAAAAAAAAAAA";
//		try {
//			ProducerTemplate template = MyPlugin.contextFuseAPI.createProducerTemplate();
//			rs = template.requestBody("direct:specialRoute2", "{\"data\":\"ddddddd\"}", String.class);
//			System.out.println("CCCCCCCCC: " + rs);
//
//			ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
//			JsonNode rootArray = mapper.readTree(rs);
//			JsonNode root = rootArray.get(0);
//			System.out.println(root.get("ID_"));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return rs;
//	}
}
