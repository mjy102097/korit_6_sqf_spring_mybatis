package com.study.SpringSecurityMybatis.controller;


import com.study.SpringSecurityMybatis.aspect.annotation.ValidAop;
import com.study.SpringSecurityMybatis.dto.request.ReqAccessDto;
import com.study.SpringSecurityMybatis.dto.request.ReqSigninDto;
import com.study.SpringSecurityMybatis.dto.request.ReqSignupDto;
import com.study.SpringSecurityMybatis.exception.SignupException;
import com.study.SpringSecurityMybatis.service.TokenService;
import com.study.SpringSecurityMybatis.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @ValidAop
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody ReqSignupDto dto, BindingResult bindingResult) throws SignupException {
        log.info("{}", dto);
        return ResponseEntity.ok().body(userService.insertUserAndRoles(dto));
    }

    @ValidAop
    @PostMapping("/signin")
    public ResponseEntity<?> signup(@Valid @RequestBody ReqSigninDto dto, BindingResult bindingResult) {
        log.info("{}", dto);
        return ResponseEntity.ok().body(userService.generatedAccessToken(dto));
    }

    @GetMapping("/access")
    public ResponseEntity<?> access(ReqAccessDto dto) {
        log.info("{}", dto);
        return ResponseEntity.ok().body(tokenService.isValidAccessToken(dto.getAccessToken()));
    }
}
