# Blocking vs Non-Blocking IO

Blocking and non-blocking are two terms you'll see pop up fairly frequently when developing Discord bots, since Discord is an inherently asynchronous platform. When creating a bot in Python you'll almost certainly be using async libraries such as discord.py, nextcord, disnake, and Hikari. These libraries use another library internally called `asyncio`. The `asyncio` library means, at a high level, that you can do multiple things at the same time in your code.

## What is concurrency?

Concurrent code is code which runs at the same time as other code within the same process. There are a couple of methods to achieve concurrency in Python. One method is to use an operating system construct called threads (via the `threading` library in Python). Threads are OS managed concurrency, essentially the OS decides when code runs, which can cause confusion and data to be modified when it's unexpected, so is now often avoided.

The second method of creating concurrent code is by using `async/await`, which is now often built into programming languages. For example, Python, JavaScript, and Rust all come with features which allow for concurrently executing code via `async/await`[¹](#1). This is known as cooperative multitasking/concurrency because the programmer decides when to hand control back to the event loop, which is in charge of scheduling the execution of tasks. This is the type of concurrency we will focus on in this article.

## What is blocking?

Blocking code is code that runs synchronously and thus *blocks* the event loop from being able to run multiple tasks in parallel. This has the effect of stopping the execution of all functions that are not the synchronous function, until the synchronous function has finished executing. This can be a big problem if you have lots of slow synchronous functions being called, as they will often block the event loop and prevent normal operation of the async tasks within it.

In Discord bots this can lead to large slowdowns, or in the case of interactions they may fail entirely due to the interaction token being valid only for 3 seconds. In this case there is no way for the library to respond to that interaction, be it a slash command, button press, etc. As a result the user will be shown a message saying the interaction has failed, and you'll likely receive an error in the console saying the interaction couldn't be responded to. For this reason it's very important that any long-running operations or operations that do input/output are non-blocking functions.

## asyncio

As mentioned above the way we do cooperative concurrency in Python is via the `asyncio` library, which is a standard library module in all modern Python versions, including all Python versions supported by libraries like discord.py.

### The basics

In order to use `asyncio` at a very basic level there are a few things you absolutely must know about it. Firstly you need to understand what a `coroutine` is. A coroutine is an important construct in `asyncio`, and is the result of calling an async function.

Let's say you define a function like the following:

```py
async def main() -> None:
    pass
```

This is an async function, as denoted by the keyword `async` ahead of `def`. When this function is called regularly it returns a coroutine object. This object can then be awaited and the event loop will handle ensuring that it gets completed:

```py
coro = main()

result = await coro()
```

In this case the result will be `None`, since the function returns nothing, but the awaited coroutine will return whatever the function returns, the difference is that you must await it to get the result, which allows the event loop to schedule its execution among other coroutines operating effectively in parallel, giving the image of everything running at the same time.

It's important to understand that async functions return coroutines, but in normal use, you'll simply await the call to an async function for clarity, such as this:

```py
result = await main()
```

To run an async function there are two ways you need to know for now:

1. Awaiting it from within another async function, as shown above.
2. Running it using `asyncio`'s `run` method, which takes in a coroutine, as shown below:

```py
from asyncio import run

async def main() -> None:
    print("The async function has run!")

run(main())
```

Running this code should yield an output of `The async function has run!` into your console.

### More information

For a more in depth tutorial about asyncio I'd recommend reading [this Real Python article](https://realpython.com/async-io-python/), which explains how more of it works in much more depth.

## References

### ¹

Golang also has concurrency built in as a first-class language feature called goroutines. Goroutines are lightweight and can be used for massive concurrency. If you're interested in learning more I'd recommend reading [this Geeks for Geeks article](https://www.geeksforgeeks.org/goroutines-concurrency-in-golang/).
