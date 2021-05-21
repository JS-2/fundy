package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PasswordRequest {
    @ApiModelProperty(example = "qwer!@1234")
    private String password;
}
