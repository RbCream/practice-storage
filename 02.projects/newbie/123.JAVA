class Solution {
    public String[] solution(String[] players, String[] callings) {
        for(int a=0; a<callings.length; a++){ //callings의 길이만큼 반복
            for(int b=1; b<players.length; b++){//players의 길이만큼 반복
                if(callings[a].equals(players[b])){ //만약 callings의 값과 players의 값이 같다면
                    String temp = players[b-1];//이전값을 저장
                    players[b-1]=callings[a];//이전값에 현재값을 넣어줌
                    players[b]=temp;//현재값에 이전값을 넣어줌
                    break;

                }
            }
        }
        String[] answer=players;//정답을 저장
        return answer;//정답을 리턴
    }
}