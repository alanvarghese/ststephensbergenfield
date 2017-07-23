package com.lemmanet.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.util.Collection;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.google.appengine.api.utils.SystemProperty;

public class QuizSocketServer extends WebSocketServer{
	
	public QuizSocketServer(int port) {
		super( new InetSocketAddress( port ) );
		// TODO Auto-generated constructor stub
	}
	
	public QuizSocketServer(InetSocketAddress address) {
		super(address);
		// TODO Auto-generated constructor stub
	}
	public static final int DEFAULT_PORT = 65080;
	private static final String NETWORK_INTERFACE_METADATA_URL =
		      "http://metadata/computeMetadata/v1beta1/instance/network-interfaces/0/access-configs/0/" +
		          "external-ip";

	
	private String hostname;

	  private String getHostname() throws IOException {
	    if (hostname == null) {
	      if (SystemProperty.environment.value().equals(SystemProperty.Environment.Value.Production)) {
	        URL url = new URL(NETWORK_INTERFACE_METADATA_URL);
	        HttpURLConnection httpUrlConnection = (HttpURLConnection) url.openConnection();
	        BufferedReader reader = new BufferedReader(
	            new InputStreamReader(httpUrlConnection.getInputStream()));
	        String result, line = reader.readLine();
	        result = line;
	        while ((line = reader.readLine()) != null) {
	          result += line;
	        }
	        hostname = result;
	      } else {
	        hostname = "localhost";
	      }
	    }
	    return hostname;
	  }
	  
	  
	  /**
	   * Returns a Websocket URL of this server.
	   *
	   * @return a Websocket URL of this server.
	   * @throws IOException when failed to get the external IP address from the metadata server.
	   */
	  public String getWebSocketURL() throws IOException {
	    return "ws://" + getHostname() + ":" + this.getPort() + "/";
	  }
	
	/**
	 * Sends <var>text</var> to all currently connected WebSocket clients.
	 * 
	 * @param text
	 *            The String to send across the network.
	 * @throws InterruptedException
	 *             When socket related I/O errors occur.
	 */
	public void sendToAll( String text ) {
		Collection<WebSocket> con = connections();
		synchronized ( con ) {
			for( WebSocket c : con ) {
				c.send( text );
			}
		}
	}


	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void onMessage(WebSocket arg0, String arg1) {
		this.sendToAll( arg1 );
		
	}


	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		// TODO Auto-generated method stub
		
	}
	


}
