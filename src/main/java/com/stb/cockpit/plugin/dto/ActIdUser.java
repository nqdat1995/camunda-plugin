package com.stb.cockpit.plugin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ActIdUser {
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String ID_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private Integer REV_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String FIRST_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String LAST_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String PWD_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String EMAIL_;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String SALT_;
}
