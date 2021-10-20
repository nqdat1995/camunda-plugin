package org.camunda.bpm.cockpit.plugin.sample.resources;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Mainnn {

	public static void main(String[] args) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate localDate = LocalDate.now();
		System.out.println(dtf.format(localDate));
	}

}
