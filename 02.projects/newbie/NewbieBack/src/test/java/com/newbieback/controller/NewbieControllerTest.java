// src/test/java/com/newbieback/controller/NewbieControllerTest.java

package com.newbieback.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NewbieController.class)
public class NewbieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testReceiveData() throws Exception {
        String testData = "Test data";

        mockMvc.perform(post("/api/data")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"text\":\"" + testData + "\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testSendData() throws Exception {
        String testData = "Test data";

        // First, send some data
        mockMvc.perform(post("/api/data")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"text\":\"" + testData + "\"}"));

        // Then, try to retrieve it
        mockMvc.perform(get("/api/data"))
                .andExpect(status().isOk())
                .andExpect(content().string(testData));
    }
}