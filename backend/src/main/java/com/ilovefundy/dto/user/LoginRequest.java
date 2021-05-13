package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LoginRequest {
    @ApiModelProperty(example = "msmf3@naver.com")
    private String userEmail;
    @ApiModelProperty(example = "qwer!1234")
    private String userPassword;
}
