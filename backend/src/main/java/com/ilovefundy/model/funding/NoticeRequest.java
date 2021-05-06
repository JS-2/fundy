package com.ilovefundy.model.funding;

import com.ilovefundy.dto.funding.FundingNotice;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor
@Valid
@Data
public class NoticeRequest {
    @NotNull
    String title;
    @NotNull
    String nickname;
    @NotNull
    String content;
//    @NotNull
//    LocalDateTime time;

    String picture;
}
