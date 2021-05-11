package com.ilovefundy.model.idol;

import com.ilovefundy.dto.idol.Idol;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MemberInfo {
    @ApiModelProperty(example = "3")
    private Integer memberId;
    @ApiModelProperty(example = "사나")
    private String memberName;
    @ApiModelProperty(example = "\"https://w.namu.la/s/2827fdedd776612ed866ac95f02f2e2a7b00cb700f176fb419002224cc2ed651d31650f19ce209c8692490fddaafe0de572ce179fb63854aa4836f75f2e71ad9ad6c24b66aa9b0423e2f1b89a8bb2408a81e2647cf0cf90097cfe9403e88d30e51a83fa255a651bb892b3eb8c125b4a6\"")
    private String memberPicture;
    @ApiModelProperty(example = "\"JYP\"")
    private String memberAgency;
    @ApiModelProperty(example = "24")
    private Integer memberAge;
    @ApiModelProperty(example = "\"1995-07-17\"")
    private String memberBirthday;
    @ApiModelProperty(example = "\"B\"")
    private Idol.BloodType memberBlood;
    @ApiModelProperty(example = "134")
    private Integer memberHeight;
    @ApiModelProperty(example = "43")
    private Integer memberWeight;
}
