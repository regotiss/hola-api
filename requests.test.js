const user = jest.createMockFromModule('./user');
user.getUser = jest.fn(userId => ({ user_id: userId, user_name: 'test' }));
const { getMatchingRequests, saveRequestHandler } = require('./requests');  

describe('requests', () => {
    it('get matching requests', () => {
        const body = {
            "title": "Need React Js Tutor",
            "description": "For assignment",
            "tags": ["react", "web"]
        }
        const params = { userId: '1' };
        const expectedResponse = {
            request: {...body, id: 1, user_id: '1'},

        }
        saveRequestHandler({ body, params }, { status: () => ({ send: () => { } }) });
        
        const actualResponse = getMatchingRequests(["react"]); 

        expect(actualResponse).toMatchObject([expectedResponse]);
    });
});