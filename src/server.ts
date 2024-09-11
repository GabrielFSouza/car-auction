import { app } from './app'
import { env } from './core/env'

app.listen(env.PORT, env.HOST, () =>
  console.log('🚀 Server is running on port ' + env.PORT),
)
