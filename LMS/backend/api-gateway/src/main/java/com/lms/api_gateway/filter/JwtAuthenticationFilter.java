package com.lms.api_gateway.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Map;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter {
//
//    private final WebClient webClient;
//
//    private Mono<Long> validateToken(String token) {
//        return webClient.post()
//                .uri("/api/auth/validate-token")
//                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .bodyValue(Collections.singletonMap("token", token))
//                .retrieve()
//                .bodyToMono(Map.class)
//                .map(response -> Long.valueOf(response.get("id").toString()));
//    }
//}

