function kmp(source,pattern){
    // partial match table
    /* 
        这个表中存放着 前缀和后缀中最长的公共元素的长度
        abcdabc 最长公共元素为abc 长度为3
        ababab 最长公共元素为abab 长度为4
    */ 
    let table = new Array(pattern.length).fill(0);
    let i = 1, j = 0;
    /*
    过程说明：
    i 与 j 的值比较，如果相同，i，j 同时向后移动，table[i] = j 代表 在i之前已有相同字符的个数
    i 与 j 的值不同，如果j未移动，还是j=0，向后移动i
    */ 
    while(i < pattern.length) {
        if(pattern[i] === pattern[j]) {
            ++i,++j;
            table[i] = j;
        } else {
            if(j > 0) {
                /*
                如果不匹配，并且之前已有比配到的字符时，
                不能直接回退到0，要根据当前j之前已有几个字符匹配，有n个字符匹配，
                说明字符串的前n个字符都已匹配到，只需回退到下标为n的位置即可
                */
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