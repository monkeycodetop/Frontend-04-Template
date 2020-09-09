function kmp(source,pattern){
    // partial match table
    // 
    /* 
        这个表中存放着 前缀和后缀中最长的公共元素的长度
        abcdabc 最长公共元素为abc 长度为3
        ababab 最长公共元素为abab 长度为4
    */ 
    let table = new Array(pattern.length).fill(0);
    let i = 1, j = 0;
    while(i < pattern.length) {
        if(pattern[i] === pattern[j]) {
            ++i,++j;
            table[i] = j;
        } else {
            if(j > 0) {
                j = table[j];
                // j = 0;
            } else {
                ++i;
            }
        }
    }
    console.log(table);
}

kmp("","aabaaac")