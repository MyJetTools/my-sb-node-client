import typescript from 'rollup-plugin-typescript2'

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      })
    ]
  },  
  // {
  //   input: './src/sb_http_client/sb_client.ts',
  //   output: {
  //     file: './lib/sb_client.js',
  //     format: 'cjs',
  //     exports: 'named',
  //     sourcemap: true
  //   },
  //   plugins: [
  //     typescript({
  //       rollupCommonJSResolveHack: false,
  //       clean: true,
  //     })
  //   ]
  // },
  // {
  //   input: './src/sb_http_client/sb_client.ts',
  //   output: {
  //     file: './lib/sb_client.esm.js',
  //     format: 'esm',
  //     exports: 'named',
  //     sourcemap: true
  //   },
  //   plugins: [typescript()],
  // },
]