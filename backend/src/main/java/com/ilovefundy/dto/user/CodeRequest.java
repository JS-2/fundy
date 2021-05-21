package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CodeRequest {
    @ApiModelProperty(example = "ABC123")
    private String code;
}
