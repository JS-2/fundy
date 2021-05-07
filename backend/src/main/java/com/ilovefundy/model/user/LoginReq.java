package com.ilovefundy.model.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LoginReq {
    @ApiModelProperty(example = "msmf3@naver.com")
    private String userEmail;
    @ApiModelProperty(example = "qwer!1234")
    private String userPassword;
}
