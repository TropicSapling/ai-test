# ai-test
An artificial intelligence that tries to jump over the obstacles at the right time. It comes up with conditions that are tested, and when true it will jump. Here are some of the greatest conditions it has come up with:
* `objy >= objx - y` (Gen 10, child 6)
* `objy >= objx <= (objdy && (93 - speed - objx / 9))` (Gen 2, child 5. From old version where `speed` still existed)
* `y <= (72 + objx)` (Gen 1, child 3)
* `objdx + y + 69 > objx` (Gen 16, child 5. Survived in **hyper-speed** for several minutes, never saw it die)
* `39 && objx <= (y) - ((89))` (Gen 1, child 8. Also seemed to survive forever)
* `objx + 17 - objy <= objdx` (Gen 2, child 17. Seemed to survive for quite a while too, got a score of 740694)
* `objx && 98 + y >= objx` (Gen 2)
* `objx <= objy + 69 >= objdy / objx` (Gen 3, child 3. Highscore ~800000)
* `objx - 60 <= 61 + objy` (Gen 2, child 37. Highscore 1781872!)
* `objx - y <= 10 + 74 + 8` (Gen 3, child 4. Highscore )

(Some of these conditions only work in certain speeds though, I tested all of them with speed set to 10)
