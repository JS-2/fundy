package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AddressRequest {
    @ApiModelProperty(example = "서울시 강북구 미아동")
    private String address;
}
