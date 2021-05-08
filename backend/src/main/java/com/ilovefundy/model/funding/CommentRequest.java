package com.ilovefundy.model.funding;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Valid
@NoArgsConstructor
public class CommentRequest {
    @NotNull
    String content;
}
