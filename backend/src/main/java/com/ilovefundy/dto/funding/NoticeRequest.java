package com.ilovefundy.dto.funding;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Valid
@Data
public class NoticeRequest {
    @NotNull
    String title;
    @NotNull
    String content;
}
