package com.stb.cockpit.plugin;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;

import com.stb.cockpit.plugin.service.PluginDefinitionRestService;

public class MyPlugin extends AbstractCockpitPlugin {
	public static final String ID = "cockpit-plugin";
//	public static CamelContext contextFuseAPI = null;

//	static {
//		try {
//			Main main = new Main();
//			main.setApplicationContextUri("/camel/xx.xml");
//			main.start();
//
//			List<RouteBuilder> lstMainRouteBuilder = main.getRouteBuilders();
//			System.out.println("LstMainRouteBuilder: " + lstMainRouteBuilder.size());
//			System.out.println("==================================");
//			for (RouteBuilder rb : lstMainRouteBuilder) {
//				System.out.println(rb.toString());
//			}
//			System.out.println("==================================");
//
//			List<CamelContext> lstCamelContext = main.getCamelContexts();
//			System.out.println("LstCamelContext: " + lstCamelContext.size());
//			System.out.println("==================================");
//			for (CamelContext cc : lstCamelContext) {
//				System.out.println(cc.getName());
//			}
//			System.out.println("==================================");
//
//			contextFuseAPI = lstCamelContext.get(0);
//
//			List<Route> lstRoutes = contextFuseAPI.getRoutes();
//			System.out.println("lstRoutes: " + lstRoutes.size());
//			System.out.println("==================================");
//			for (Route it : lstRoutes) {
//				System.out.println(it.getId());
//			}
//			System.out.println("==================================");
//			contextFuseAPI.start();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

	public String getId() {
		return ID;
	}

	@Override
	public Set<Class<?>> getResourceClasses() {
		Set<Class<?>> classes = new HashSet<Class<?>>();

		classes.add(PluginDefinitionRestService.class);

		return classes;
	}

	@Override
	public List<String> getMappingFiles() {
		return Arrays.asList("org/camunda/bpm/cockpit/plugin/sample/queries/sample.xml");
	}
}