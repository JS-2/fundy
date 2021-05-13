package com.ilovefundy.model.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FanAuth {
    @ApiModelProperty(hidden = true)
    Integer userId;
    @ApiModelProperty(example = "저는 유애나 1기로 아이유 팬활동을 ~~")
    String fanHistory;
}
