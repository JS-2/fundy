package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class IsGoodProjectRequest {
    @ApiModelProperty(example = "Y or N")
    private String isGoodProject;
}
