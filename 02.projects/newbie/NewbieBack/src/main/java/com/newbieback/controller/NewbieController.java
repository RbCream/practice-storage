// src/main/java/com/example/NewbieBack/controller/DataController.java
package com.newbieback.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class NewbieController {

    private String storedData = "";

    @PostMapping("/data")
    public void receiveData(@RequestBody DataRequest request) {
        storedData = request.getText();
    }

    @GetMapping("/data")
    public String sendData() {
        return storedData;
    }

    static class DataRequest {
        private String text;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}