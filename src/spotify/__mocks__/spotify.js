
const Spotify = {
    getSongs: jest.fn(()=>{
        return Promise.resolve({})
    }),
/*     getUserId: jest.fn(()=>{
        return Promise.resolve({
            status: "",
            data: {}
        })
    }), */
     getUserId: jest.fn().mockResolvedValue({
        country: "Czechia",
        displayName: "Robot",
        id: "9876",

    }),

}

export default Spotify;