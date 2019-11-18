import rp from "request-promise-native";

describe("Is server working", () => {
    
    it("assert exposed", async () => {
        let resp = await rp("http://localhost:3000/");
        expect(resp).toBe("Let's moving on !");
    });

    it("assert 200 http code", async () => {
        let resp = await rp("http://localhost:3000/");
        expect(resp.status).toBe(200);
    });
});
