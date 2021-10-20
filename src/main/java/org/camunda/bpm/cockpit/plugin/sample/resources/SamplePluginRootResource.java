/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.cockpit.plugin.sample.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.apache.camel.ProducerTemplate;
import org.camunda.bpm.cockpit.plugin.resource.AbstractPluginRootResource;
import org.camunda.bpm.cockpit.plugin.sample.SamplePlugin;

/**
 *
 * @author nico.rehwaldt
 */
@Path("plugin/" + SamplePlugin.ID)
public class SamplePluginRootResource extends AbstractPluginRootResource {
	public SamplePluginRootResource() throws Exception {
		super(SamplePlugin.ID);
	}

	@Path("{engineName}/process-instance")
	public ProcessInstanceResource getProcessInstanceResource(@PathParam("engineName") String engineName) {
		System.out.println("vvv2");
		try {
			ProducerTemplate template = SamplePlugin.contextFuseAPI.createProducerTemplate();
			Object aa = template.requestBody("direct:specialRoute", "{\"data\":\"ddddddd\"}");
			System.out.println("CCCCCCCCC: " + aa);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//AbstractApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext-camel.xml");
		
		
		return subResource(new ProcessInstanceResource(engineName), engineName);
	}

	@GET
	@Path("{engineName}/zzzz")
	public String zzzz(@PathParam("engineName") String engineName) {
		System.out.println("zzzzzzzzzzzzzzzzz");
		String rs = "";
		try {
			ProducerTemplate template = SamplePlugin.contextFuseAPI.createProducerTemplate();
			rs = template.requestBody("direct:specialRoute", "{\"data\":\"ddddddd\"}", String.class);
			System.out.println("CCCCCCCCC: " + rs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}
}
