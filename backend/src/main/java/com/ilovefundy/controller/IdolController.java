package com.ilovefundy.controller;

import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.service.IdolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class IdolController {
    private final IdolService idolService;

    @GetMapping("/idols")
    public ResponseEntity<Object> idolList(@RequestParam(defaultValue = "1") int page, int per_page,
                                           @RequestParam(required = false) String keyword) {
        List<Idol> idolList = idolService.getIdolList(page-1, per_page);

        return new ResponseEntity<>(idolList, HttpStatus.OK);
    }

    @GetMapping("/idols/{idol_id}")
    public ResponseEntity<Object> idolDetail(@PathVariable int idol_id) {
        Idol idol = idolService.getIdol(idol_id);

        return new ResponseEntity<>(idol, HttpStatus.OK);
    }
}
